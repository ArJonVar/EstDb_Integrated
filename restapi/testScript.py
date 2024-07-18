import time
import requests
from requests.structures import CaseInsensitiveDict
import json


def log(message, data, space=False):
    with open("/home/vardy/test_log.txt", "a") as file:
        file.write(f' {time.asctime(time.localtime(time.time()))}') 
        file.write(f' {message}: {data}') 
        file.write(f'\n')
        if space==True:
            file.write(f'\n\n')

def auth_flow(reactAuthCode):
    
    def log(message, data, space=False):
        with open("/home/vardy/test_log.txt", "a") as file:
            file.write(f' {time.asctime(time.localtime(time.time()))}') 
            file.write(f' {message}: {data}') 
            file.write(f'\n')
            if space==True:
                file.write(f'\n\n')
    
    log(message="start of oath, react post", data=reactAuthCode)

    def get_access_token(auth_code=reactAuthCode):
        url = "https://api.smartsheet.com/2.0/token"
        headers = CaseInsensitiveDict()
        headers["Content-Type"] = "application/x-www-form-urlencoded"
        data = f'grant_type=authorization_code&code={auth_code}&client_id=o50ix7yzq7uh61cdqld&client_secret=SECRET'
        r=requests.post(url=url, data=data, headers=headers)
        result_json=json.loads(r.content)
        log(message='result_json',data=result_json)
        access_token= result_json['access_token']
        log(message='access_token', data=access_token)
        return(access_token)
    def get_user_data(access_token):
        url = "https://api.smartsheet.com/2.0/users/me"
        headers = CaseInsensitiveDict()
        headers["Authorization"] = f'Bearer {access_token}'
        r = requests.get(url, headers=headers)
        user_data=json.dumps(r.json(), indent=2)
        log(message= 'user_data', data=user_data, space = True)
        return(user_data) 
    #def patch_user_data(pk, user_data):
    #    url= f'https://estimating-database.io/restapi/userdata/{pk}/'
    #    headers = CaseInsensitiveDict()
    #    headers["Content-Type"] = "application/json" 
    #    r=requests.patch(url=url, data={"userData":user_data}, headers=headers)
    #    log(message = 'patch status', data = r.status_code, space = True)

    access_token = get_access_token(reactAuthCode)
    user_data = get_user_data(access_token)
    #patch_user_data(reactAuthCode.pk,user_data)
    return(user_data)
