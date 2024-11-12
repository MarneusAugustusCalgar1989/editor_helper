from PIL import Image
   
def add_logo_to_photo(input_name:str = '', type_of_watermark:str = '', output_name:str = ''):
    '''Функиця принимает ссыку на источник изображения, затем на водяной знак, а после просит имя, под которым все это надо сохранить'''
    
    if len(input_name) == 0 or len(type_of_watermark) == 0 or len(output_name) == 0:
       print('Что-то забыли ввести')
    else:
        img = Image.open(input_name).convert('RGBA')      
        exif_data = img.getexif()
        for i in exif_data:
            if i == 274:
                if exif_data[i] == 1:
                    pass
                elif exif_data[i] == 6:
                    img = img.rotate(-90, Image.NEAREST, expand = 1)
                elif exif_data[i] == 3:
                    img = img.rotate(-180, Image.NEAREST, expand = 1)
                elif exif_data[i] == 8:
                    img = img.rotate(-270, Image.NEAREST, expand = 1)
                    
        
        
        if img.width > 2000:
            prop = img.width/img.height
            new_height = int(2000/prop)
            img = img.resize((2000, new_height), resample=0)           
                        
        logo = Image.open(type_of_watermark).convert('RGBA')
        logo_ratio = logo.width/logo.height
        logo_new_width = int(img.width/6)
        logo_new_height = int(logo_new_width/logo_ratio)
        logo = logo.resize((logo_new_width, logo_new_height), resample = 0)
        
        img.paste(logo, (img.width - logo.size[0] - logo.size[0]//8, img.size[1] - logo.size[1] - logo.height//4), logo)        
        print(output_name)
        img = img.convert('RGB')
        
        
        
        img.save(output_name)
        img.close()
        logo.close()
       
   
   
    


    
        
    
    
    