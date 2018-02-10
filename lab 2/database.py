import psycopg2

def connectDB():
    fly_conn = psycopg2.connect(dbname="booking", user="postgres", password = "Wilder1248")
    hotel_conn = psycopg2.connect(dbname="hotel_booking", user="postgres", password = "Wilder1248")
    account_conn = psycopg2.connect(dbname="account", user="postgres", password="Wilder1248")
    return account_conn, fly_conn, hotel_conn,

def insertHotelBooking():
    return " INSERT INTO hotel (client_name, hotel_name, arrival, departure) VALUES(%s,%s,%s,%s);"

def insertFlyghtBooking():
    return "INSERT INTO fly_booking (client_name, fly_number, from_city, to_city, date) VALUES(%s,%s,%s,%s,%s);"

def insertAccount():
    return "INSERT INTO account (client_name, ammount) VALUES(%s,%s,%s,%s);"

def updateAccountBalance():
    return "UPDATE account SET ammount = ammount - {} WHERE account_id = 1;"

def get_all(conn, table):
    cursor = conn.cursor()
    cursor.execute("SELECT * from {0};".format(table))
    conn.commit()
    return cursor.fetchall()
