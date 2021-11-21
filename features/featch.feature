
Feature: Booking ticket
    Scenario: One ticket should be booked
        Given The user is on the page "http://qamid.tmweb.ru/client/index.php"
        When The user reserves one seat in the hall
        Then The user received an electronic ticket

    Scenario: Two tickets should be booked
        Given The user is on the page "http://qamid.tmweb.ru/client/index.php"
        When The user reserves two seats in the hall
        Then The user received an electronic ticket

    Scenario: Must not book a booked ticket
        Given The user is on the page "http://qamid.tmweb.ru/client/index.php"
        When The user reserves the reserved seat
        Then The user cannot book the reserved seat