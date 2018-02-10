import sys
import psycopg2
from database import *

def book_flight_and_hotel(account_conn, fly_conn, hotel_conn):

    fly_conn.tpc_begin(fly_conn.xid(100, 'transaction ID', 'connection 1'))
    hotel_conn.tpc_begin(hotel_conn.xid(100, 'transaction ID', 'connection 2'))
    account_conn.tpc_begin(account_conn.xid(100, 'transaction ID', 'connection 3'))

    try:
        account_conn.cursor().execute(updateAccountBalance().format(200))
        account_conn.tpc_prepare()

        fly_conn.cursor().execute(insertFlyghtBooking(), ('TEST', 'TEST123', 'KBP', 'SHA', '01/02/2017'))
        fly_conn.tpc_prepare()

        hotel_conn.cursor().execute(insertHotelBooking(), ('TEST', 'Hostel', '01/02/2017', '02/01/2018'))
        hotel_conn.tpc_prepare()

        fly_conn.tpc_commit()
        account_conn.tpc_commit()
        hotel_conn.tpc_commit()
    except Exception as error:
        print("----Booking error----")
        print(error)

        fly_conn.tpc_rollback()
        account_conn.tpc_rollback()
        hotel_conn.tpc_rollback()
        sys.exit(1)
    else:
        print("----Booking success----")

def main():
    account_conn, fly_conn, hotel_conn = connectDB()
    book_flight_and_hotel(account_conn, fly_conn, hotel_conn)

if __name__ == '__main__':
    main()

