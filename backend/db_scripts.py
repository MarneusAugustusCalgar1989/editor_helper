import psycopg2
import json

def get_db_connection():    
      conn = psycopg2.connect('some database')
      return conn 


def get_users():
    conn = get_db_connection()
    cur = conn.cursor()
    sql = '''SELECT username FROM users'''
    cur.execute(sql)
    users = cur.fetchall()
    cur.close()
    conn.close()
    return users 


def get_user_pass(username): 
      conn = get_db_connection()
      cur = conn.cursor()
      cur.execute(f'SELECT password FROM users WHERE username = \'{username}\';')
      passes = cur.fetchone()
      cur.close()  
      conn.close()    
      return passes   

def get_user_role(username): 
      conn = get_db_connection()
      cur = conn.cursor()
      cur.execute(f'SELECT role FROM users WHERE username = \'{username}\';')
      role = cur.fetchone()
      cur.close()  
      conn.close()    
      return role   


def check_pass(user, passw):
     
     conn = get_db_connection()
     cur = conn.cursor()
     cur.execute(f'SELECT password FROM users WHERE username = \'{user}\';')
     db_passw = cur.fetchone()     
     cur.close()  
     conn.close()     

     if f'{db_passw[0]}' != passw:
          print('NOT AUTH!')
          return False     
     print('AUTH')
     return True   
      
def set_user(u, p):
    conn = get_db_connection()
    cur = conn.cursor()
    sql = """INSERT INTO users (username, password) VALUES (%s, %s)"""
    val = (u,p)
    cur.execute(sql, val)
    conn.commit()
    print(cur.rowcount, 'New data added')
    cur.close()
    conn.close()
    return True

def default_request(sql, val):
      conn = get_db_connection()
      cur = conn.cursor()
      cur.execute(sql, val)
      conn.commit()
      cur.close()
      conn.close()
      print(cur.rowcount, 'New useractivity added')
      
      return True


def add_user_activity(data):       
      
      conn = get_db_connection()
      cur = conn.cursor()
      cur.execute(f'select history from users where username = \'{str(data['username'])}\'')
      user_activities = cur.fetchone()            
      if user_activities[0] == [{"Default": "Default"}]:
           
           user_activities = (data,)           
           cur.execute(f'update users set history = \'{json.dumps(user_activities)}\' where username = \'{data['username']}\'')
      else:
           
           user_activities[0].append(data)           
           user_activities = json.dumps(user_activities[0])           
           cur.execute(f'update users set history = \'{user_activities}\' where username = \'{data['username']}\'')
           
      
      conn.commit()
      cur.close()
      conn.close()
      return True


def get_user_activities(data):
      conn = get_db_connection()
      cur = conn.cursor()
      cur.execute(f'SELECT history FROM users WHERE username = \'{str(data['username'])}\'')
      user_activities = cur.fetchone()      
      cur.close()
      conn.close()
      return user_activities

def remove_user_activities(data):
      
      conn = get_db_connection()
      cur = conn.cursor()
      cur.execute(f'select history from users where username = \'{str(data['username'])}\'')
      user_history = cur.fetchall()
      user_history = user_history[0][0]     
      for i in user_history:
            if i['requestText'] == data['index']:
                  user_history.remove(i)
      
      user_history = json.dumps(user_history)
      if user_history == '[]':
            cur.execute(f'update users set history = default where username = \'{data['username']}\'')
      else:
            cur.execute(f'update users set history = \'{user_history}\' where username = \'{data['username']}\'')
      cur.execute(f'SELECT history FROM users WHERE username = \'{str(data['username'])}\'')
      user_activities = cur.fetchone()                  
      conn.commit()
      cur.close()
      conn.close()
      
      
            
      return user_activities
      
