from datetime import datetime
import random
import string

def generate_temp_filename():
    now = datetime.now()
    dt_string = now.strftime("%d_%m_%Y_%H_%M_%S")
    random_string = ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))
    filename = dt_string + '_' + random_string
    return filename