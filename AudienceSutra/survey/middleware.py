from accounts.models import UserProfile
from django.shortcuts import HttpResponseRedirect


class LoginRequiredMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        return response

    def process_view(self, request, view_func, *view_args, **view_kargs):
        if request.user.is_authenticated():

            if "/payment" in request.path:
                pass
            elif "/admin/" in request.path:
                pass
            elif request.path == '/':
                pass
            elif request.path == "/check_profile":
                pass
            elif request.path == "/accounts/logout/":
                pass
            elif "/state/" in request.path:
                pass
            elif request.user.is_superuser:
                pass
            else:
                user = UserProfile.objects.get(user=request.user)

                if not user.user_type:
                    if not request.path == '/user/type':
                        return HttpResponseRedirect("/user/type")
                elif user.user_type == 'Client' and request.user.is_superuser is False:
                    if user.first_name is None or user.city is None or user.state is None or \
                            user.pincode is None or user.country is None:
                        if not request.path == '/client/intro':
                            return HttpResponseRedirect("/client/intro")
                    elif user.company_name is None or user.email is None or user.designation is None or \
                            user.address is None or user.phone is None:
                        if not request.path == '/client/intro':
                            return HttpResponseRedirect("/client/intro")
                elif user.user_type == 'Respondent' and request.user.is_superuser is False:
                    if user.first_name is None or user.city is None or user.state is None or \
                            user.pincode is None or user.country is None:
                        if not request.path == '/respondent/intro':
                            return HttpResponseRedirect("/respondent/intro")
                else:
                    pass
        else:
            if "/admin" in request.path:
                pass
            elif request.path == '/':
                pass
            elif "/accounts/google/" in request.path or "/accounts/signup/" in request.path or \
                    "/accounts/facebook/" in request.path or "/accounts/password/reset/" in request.path:
                pass
            elif "/import/" in request.path:
                pass
            elif "/privacy" in request.path:
                pass
            elif "/refund" in request.path:
                pass
            elif "/terms" in request.path:
                pass
            elif not request.path == '/accounts/login/':
                return HttpResponseRedirect("/accounts/login/")
