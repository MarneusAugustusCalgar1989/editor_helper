import os
import json
from flask import Flask, render_template, request, url_for, send_from_directory, send_file, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
from scripts.pdf_creator import makePDF
import datetime

from scripts.logotyper import add_logo_to_photo
from scripts.qr_generator import make_logo_to_qr, make_qr_code_for_url
from scripts.record_converter import convert_audio
from scripts.db_scripts import get_db_connection, get_user_pass, set_user, get_users, check_pass, add_user_activity, get_user_activities, remove_user_activities, get_user_role
from scripts.jwt_maker import make_jwt
from scripts.user_check import user_check


# Определяем и форматируем текущую дату
current_date = datetime.date.today()
current_month = current_date.month

if current_month < 10:
    current_month = f'0{current_month}'
date_to_print = f'От {current_date.day}.{current_month}.{current_date.year}'

path = '213.59.156.172'

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app, origins = ['some_urls'])



@app.route('/', methods = ['POST', 'GET'])
def index():    
    print(url_for('index'))
    return render_template('index2.html')
    

@app.route('/authorisate', methods = ['POST', 'GET'])
def authorisate():
    print(url_for('authorisate'))
    input_data = request.get_json()
    usrs = get_users()   
    
    for i in usrs:
      if f'{i[0]}' == input_data['username']:        
        if check_pass(input_data['username'], input_data['password']) == True:            
            token = make_jwt({'header':input_data['username'], 'body': input_data['password']})            
            return token
            
    return 'Неверный пароль'
    
@app.route('/get_users', methods = ['GET'])
def get_users_list():
  print(url_for('get_users_list'))
  users = get_users()  
  users = json.dumps(users)  
  
  return users


@app.route('/singingin', methods = ['POST'])
def singingin():
  url_for('singingin')
  input_data = request.get_json()
  set_user(input_data['username'], input_data['password'])  
  return 'Some ok'


@app.route('/convert_audio', methods = ['POST'])
def audio_convert():
    print(url_for('audio_convert'))
    user_token = request.form.get('text')   
    
    if user_check(user_token):     
        user_name = request.form.get('username')
        time_stamp = request.form.get('timeStamp') 
        input_file = request.files['file']        
        input_filename = user_name + '_' + time_stamp + '_' + input_file.filename
        input_file.save(os.path.join('sounds', input_filename))
        print(f'Файл {input_filename} успешно загружен.') if input_filename in os.listdir('sounds') else print('Что-то пошло не так')         
        
        
        convert_audio(os.path.join('sounds', input_filename), 'mp3')
        output_name = input_filename[:-3] + 'mp3'
        user_data = {'username': request.form.get('username'), 'convert_audio': input_filename, 'requestText': output_name, 'timeStamp': request.form.get('timeStamp')}        
        add_user_activity(user_data)        
        
        return send_from_directory(os.path.join('sounds', 'converted'), output_name)
    print('Bad request')
    return '<h1>Bad request</h1>'
    
    
@app.route('/add_logo_test', methods = ['POST'])
def add_logo_test():
    print(url_for('add_logo_test'))
    input_file = request.files['file']
    input_filename = input_file.filename
    user_token = request.form.get('text')
    user_name = request.form.get('username')
    time_stamp = request.form.get('timeStamp')
        
    if user_check(user_token):
        user_role = get_user_role(user_name)[0]
        if user_role == 'admin':
            logo_src = 'logotyper/logos/to_logo.png' 
        else: 
            logo_src = 'logotyper/logos/fake_logo.png'
        
        print(user_role)       
        input_file.save(os.path.join('logotyper', user_name + '_' + time_stamp + '_' + input_filename))
        input_filename = user_name + '_' + time_stamp + '_' + input_filename    
        print(f'Файл {input_filename} успешно загружен.') if input_filename in os.listdir('logotyper') else print('Что-то пошло не так')         
       
        add_logo_to_photo(os.path.join('logotyper', input_filename), logo_src, os.path.join('logotyper', 'converted', '_to_' + input_filename))
        print(f'Картинка {input_filename} успешно облоготиплена.')       
        user_data = {'username': request.form.get('username'), 'logotype_image': input_filename + '_' + user_name + '_' + time_stamp, 'requestText':os.path.join('_to_' + input_filename), 'timeStamp': request.form.get('timeStamp')}        
        add_user_activity(user_data)        
    
        return send_from_directory(os.path.join('logotyper', 'converted'), '_to_' + input_filename)
    print('Bad request')
        
    return '<h1>Bad request</h1>'

@app.route('/cleaner_for_img', methods = ['POST'])
def cleaner_for_img():    
    print(url_for('cleaner_for_img'))
    user_token = request.data.decode('utf-8')         
    if user_check(user_token):
        if len(os.listdir('logotyper/converted')):
            for i in os.listdir('logotyper/converted'):
                print(i + ' удалено')
                os.remove('logotyper/converted/' + i)
    
        if len(os.listdir('logotyper/')):
            for i in os.listdir('logotyper/'):
                if '.jpg' in i:
                    print(i + ' удалено')
                    os.remove('logotyper/' + i)
                
    
        
        return 'Images was deleted'
    print('Bad request')
    return '<h1>Bad request</h1>'
    
@app.route('/cleaner_for_unconverted', methods = ['POST'])
def cleaner_for_unconverted():    
    print(url_for('cleaner_for_unconverted'))
    user_token = request.data.decode('utf-8')         
    if user_check(user_token):      
    
        if len(os.listdir('logotyper/')):
            for i in os.listdir('logotyper/'):
                if i[-4:-3] == '.':                
                    print(i + ' удалено')
                    os.remove('logotyper/' + i)
                
    
        
        return 'Images was deleted'
    print('Bad request')
    return '<h1>Bad request</h1>'
  
@app.route('/cleaner_for_audio', methods = ['POST'])
def cleaner_for_audio():
    print(url_for('cleaner_for_audio'))
    user_token = request.form.get('text')
    if user_check(user_token):
        for _ in os.listdir('sounds'):
            if _ != 'converted':
                os.remove('sounds/' + _)
        for _ in os.listdir('sounds/converted'):
            os.remove('sounds/converted/' + _)
            
        
        return 'Audios was deleted'
    print('Bad request')
    return '<h1>Bad request</h1>'

@app.route('/cleaner_for_unconverted_audio', methods = ['POST'])
def cleaner_for_unconverted_audio():
    print(url_for('cleaner_for_audio'))
    user_token = request.form.get('text')
    if user_check(user_token):
        for _ in os.listdir('sounds'):
            if _ != 'converted':
                os.remove('sounds/' + _)
        
        return 'Audios was deleted'
    print('Bad request')
    return '<h1>Bad request</h1>'


@app.route('/send_document_data', methods = ['POST', 'GET'])
def send_document_data():
    print(url_for('send_document_data'))
    input_data = request.get_json()
    user_name = input_data['username']
    user_token = input_data['user']    
    if user_check(user_token):
        user_role = get_user_role(user_name)[0]
        print(user_role)
        input_header = input_data['type']
        input_adress = input_data['adress']
        input_body = input_data['requestText']
        input_sign = input_data['sign']
        input_sign_stamp = input_data['stamp']
        input_from_who = input_data['fromWho']        

        my_page = render_template('blank.html', today_date = date_to_print, to_who = input_adress, zapros_text = f'{input_body}', direction = input_header, mHead = input_from_who, signature = input_sign, isStamp = input_sign_stamp, user_role = user_role)
        zhaloba_page = open('./templates/zhaloba.html', 'w+')
        zhaloba_page.write(my_page)        
        zhaloba_page.close()
        makePDF()        
        add_user_activity(input_data)
        return send_from_directory('', 'request.pdf')
    return 'Bad request'

@app.route('/print', methods = ['GET'])
def to_print():
    print(url_for('to_print'))
    if request.access_route[0] == path:
        return render_template('zhaloba.html')
    else: 
        return 'Bad request'
    

@app.route('/download', methods=['GET', 'POST'])
def download():    
    print(url_for('download'))
    input_data = request.get_json()    
    if user_check(input_data['user']):    
        print(input_data['username'])
        print(input_data['user'])
        return send_from_directory('', 'request.pdf')
    else: 
        return 'Bad request'


# Работа с кабинетом пользователя

@app.route('/get_activities', methods = ['POST', 'GET'])
def get_activity():
    print(url_for('get_activity'))
    input_data = request.get_json()
    if user_check(input_data['user']):
        data_to_send = get_user_activities(input_data)
        
        return json.dumps(data_to_send)
        
        
    return "Bad request"

@app.route('/remove_activity', methods = ['POST'])
def remove_activity():
    print(url_for('remove_activity'))    
    input_data = request.get_json()    
    if user_check(input_data['user']):        
        user_activities = json.dumps(remove_user_activities(input_data))
        print(input_data['index'])
        if input_data['index'][-3:] == 'mp3': 
            for i in os.listdir('sounds/converted'):
                if i == input_data['index']:
                    os.remove('sounds/converted/' + i)
        if input_data['index'][-3:] == 'jpg' or input_data['index'][-3:] == 'jpeg': 
            for i in os.listdir('logotyper/converted'):
                if i == input_data['index']:
                    os.remove('logotyper/converted/' + i)
        return user_activities
    else:
        return "Bad request"
    

#Базовая настройка отдачи всякого разного

@app.route('/converted_images/<image>', methods = ['GET'])
def gimme_images(image):    
  if user_check(request.headers.get('user')):
      return send_from_directory(os.path.join('logotyper', 'converted'), image)
  else:
      return 'Bad request'
  
  
  
  
    
@app.route('/converted_sounds/<sound>', methods = ['GET'])
def gimme_sounds(sound):
  if user_check(request.headers.get('user')):
      return send_from_directory(os.path.join('sounds', 'converted'), sound)
  else: 
      return 'Bad request'
    

if __name__ == '__main__':
    app.run(debug = True, host = '0.0.0.0', port = '3000')