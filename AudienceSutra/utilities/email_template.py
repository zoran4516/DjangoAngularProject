def verify_email_template(user):
    template = "name: " + user.first_name + "<br>ID: " + \
               str(user.id) + " has an invalid email id (" + str(user.email) + "). Do have it changed"

    return template

# def verify_mobile_template(student):
#     template = "name: " + student.first_name + "<br>ID: " + \
#                str(student.id) + " has an invalid email id (" + str(student.email) + "). Do have it changed"
#
#     return template
