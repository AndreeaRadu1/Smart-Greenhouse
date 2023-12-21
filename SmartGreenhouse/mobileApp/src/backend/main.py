from flask import Flask
from flask_restful import Api, Resource, reqparse
from gpiozero import DigitalInputDevice
import RPi.GPIO as GPIO
import adafruit_dht
from board import *
import busio
import board
import adafruit_ads1x15.ads1115 as ADS
from adafruit_ads1x15.analog_in import AnalogIn
import time
import Adafruit_DHT
import firebase_admin
from firebase_admin import db, credentials
from datetime import datetime
import calendar

import numpy as np

GPIO.setmode(GPIO.BCM)

# pompa - relay in1
GPIO.setup(27,GPIO.OUT)

# fan - relay in2
GPIO.setup(22,GPIO.OUT)

#air temperature and humidity
SENSOR_PIN = Adafruit_DHT.DHT11 #D21
GPIO_temp = 21
humidity, temperature = Adafruit_DHT.read_retry(SENSOR_PIN,GPIO_temp)

#light sensor
GPIO.setup(20, GPIO.IN)

GPIO_umid_sol = 26
GPIO.setup(GPIO_umid_sol, GPIO.IN)

app = Flask(__name__)
api = Api(app)

# authenticate to firebase
cred = credentials.Certificate("credentials.json")
firebase_admin.initialize_app(cred, {"databaseURL": "https://smartgreenhouse-e66ef-default-rtdb.europe-west1.firebasedatabase.app/"})
ref = db.reference("/")

current_date = datetime.now()

class DataBase(Resource):
    counter = 0

    def get_month_name(month_number):
        return calendar.month_name[month_number].lower()

    def update_pump_times_used():
        current_month = DataBase.get_month_name(current_date.month)
        current_year = str(current_date.year)
        path = "/"+current_year+"/"+current_month+"/"
        pump_times_used = db.reference(path + "pump_times_used").get()
        db.reference(path).update({"pump_times_used": pump_times_used+1})

    def update_fan_times_used():
        current_month = DataBase.get_month_name(current_date.month)
        current_year = str(current_date.year)
        path = "/"+current_year+"/"+current_month+"/"
        fan_times_used = db.reference(path + "fan_times_used").get()
        db.reference(path).update({"fan_times_used": fan_times_used+1})
    
    @staticmethod
    def check_values():
        while DataBase.counter == 0:
            if DataBase.counter == 1:
                print("system off")
                break
                
            # check soil humidity
            if GPIO.input(GPIO_umid_sol) == 0:
                GPIO.output(27,True)
                print("pump open")
                time.sleep(5)
                GPIO.output(27,False)
                DataBase.update_pump_times_used()
                print("the plants were watered")
                
            # check tmperature
            if temperature > 23:
                GPIO.output(22,True)
                print("fan open")
                time.sleep(10)
                GPIO.output(22,False)
                DataBase.update_fan_times_used()
                print("the plants were ventilated")
                
            
    def get(self,id = 0):
        print('"sensor": [\n{')
        if id == 0:
            return "Request invalid", 404        
        #light sensor
        if id == 1: 
            if GPIO.input(20):
                message = "It's dark!"
            else:
                message = "It's light"
            dictionary = {
                "sensors": {
                     "sensor": "light",
                     "value": GPIO.input(20) # 1 - dark, 0 - light
                    }
            }
            print(message)
            return dictionary
        # humidity soil
        if id == 2: 
            if GPIO.input(GPIO_umid_sol):
                message = "Water detected"
            else:
                message = "No water detected"
            dictionary = {
                "sensors": {
                     "sensor": "moisture",
                     "value": GPIO.input(GPIO_umid_sol) # 0 - no water detected
                    }
            }
            print(dictionary)
            return dictionary
        # air humidity
        if id == 3: 
            #humidity = dht11.humidity
            dictionary = {
                "sensors": {
                     "sensor": "humidity - air",
                     "value": humidity
                    }
                }
            return dictionary, 200
        # air temperature
        if id == 4:
            #temperature = dht11.temperature
            dictionary = {
                "sensors": {
                    "sensor": "temperature - air",
                    "value": temperature
                    }
                }
            print(temperature)
            return dictionary, 200
        # pump
        if id == 5:
            GPIO.output(27,True)
            print("pump open")
            time.sleep(5)
            GPIO.output(27,False)
            DataBase.update_pump_times_used()
            return "the plants were watered"
        # fan
        if id == 6:
            GPIO.output(22,True)
            print("fan open")
            time.sleep(10)
            GPIO.output(22,False)
            DataBase.update_fan_times_used()
            return "the plants were ventilated!"
        # system on
        if id == 7:
            DataBase.counter = 0
            DataBase.check_values()
            return DataBase.counter
        # system off
        if id == 8:         
            DataBase.counter = 1
            DataBase.check_values()
            return DataBase.counter

        return "Not found", 404
api.add_resource(DataBase,"/api","/api/<int:id>")
if __name__ == '__main__':
    app.run(debug = True,host='0.0.0.0')
