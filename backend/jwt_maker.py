import jwt

def make_jwt(auth_data):   
    print(auth_data) 
    encoded_token = jwt.encode({'header':auth_data['header'], 'body': auth_data['body']}, 'some_key', algorithm='HS256')    
    return encoded_token
    
        
def decode_jwt(auth_jwt):
    decoded = jwt.decode(auth_jwt, '31217221027711', algorithms=['HS256'])
    return decoded



