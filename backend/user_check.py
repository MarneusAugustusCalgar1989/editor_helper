import os
from PIL import Image
from pydub import AudioSegment


def convert_audio(file_source:str = '', to_format:str = ''):
    '''Функция принимает ссылку на файл и пожелание, в какой формат его нужно конвертировать.'''
    
    if len(file_source) == 0 or len(to_format) == 0:
        print('Забыли что-то добавить')
    else:             
        
        file_form = file_source[-3:]    
        song = AudioSegment.from_file(file_source, file_form)
        output_name = file_source[:6] + '/converted/' + file_source[7:-4] +'.' + to_format   
        song.export(output_name, format = to_format)
        print(f'Файл {file_source[7:]} был сконвертирован в {to_format}') 
    
    
    
