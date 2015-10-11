activites_MET = {
    'walking': 2.0,
    'jogging': 8.0,
    'cycling': 6.0,
    'basketball': 7.5,
}

# def shitty_calories_burned(gender, age, weight, heart_rate, time):
    # if gender == 'M':
        # return (((age * 0.2017) - (weight * 0.09036) + (heart_rate * 0.6309) - 55.0969])
            # * time / 4.184)
    # elif gender == 'F':
        # return (((age * 0.2017) - (weight * 0.09036) + (heart_rate * 0.6309) - 55.0969])
            # * time / 4.184)

def calories_burned(activity, time, weight):
    return activites_MET[activity] * time * weight
