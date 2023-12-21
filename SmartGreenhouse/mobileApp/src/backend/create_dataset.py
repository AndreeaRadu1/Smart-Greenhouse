import firebase_admin
from firebase_admin import db, credentials
import csv
import json
from collections import OrderedDict
import lstm_for_predicting_energy_consumption

# authenticate to firebase
cred = credentials.Certificate("credentials.json")
firebase_admin.initialize_app(cred, {"databaseURL": "https://smartgreenhouse-e66ef-default-rtdb.europe-west1.firebasedatabase.app/"})
ref = db.reference("/")

def database_to_csv_file():
    months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']

    dictionary = ref.get()

    header = ['Year-Month', 'EnergyConsumed']

    data_file = open('dataset.csv', 'w')
    csv_writer = csv.writer(data_file)
    csv_writer.writerow(header)

    for year in dictionary:
        for month in OrderedDict(sorted(dictionary[year].items(), key = lambda x:months.index(x[0]))):
            fan_times_used = dictionary[year][month]['fan_times_used']
            pump_times_used = dictionary[year][month]['pump_times_used']
            # monthly energy usage formula in kWh
            # relay = 0.4W, pump = 1W, fan = 1.7W, raspberry = 5W
            # estimating that a pump operates for 1.5 minutes every time it is used and a fan 1.5 hours
            # raspberry is on 24/7
            energy = ((0.4+1+1.7+5)*(pump_times_used*0.025+fan_times_used*1.5+730))/1000
            row  = [year+'-'+month, energy]
            csv_writer.writerow(row)

    data_file.close()

if __name__ == "__main__":
    # database_to_csv_file()
    # db.reference("/2022/december/").update({"fan_times_used": 0})
    # db.reference("/2022/december/").update({"pump_times_used": 4})
    # print prediction for february 
    value = lstm_for_predicting_energy_consumption.predict_energy(1)
    print("value: ", value[0])