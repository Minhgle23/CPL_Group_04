def captchaHome():
    driver.execute_script('var element=document.getElementById("g-recaptcha-response"); element.style.display="";')
    service_key = 'xxxxxxxxxxxxxxxxxxxxxx'  # 2captcha service key
    google_site_key = 'xxxxxxxxxxxxxxxxxxxxxxxxxx'  # reCAPTCHAのdata-sitekey
    pageurl = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    url = "http://2captcha.com/in.php?key=" + service_key + "&method=userrecaptcha&googlekey=" + google_site_key + "&pageurl=" + pageurl
    resp = requests.get(url)
    if resp.text[0:2] != 'OK':
        quit('Service error. Error code:' + resp.text)
    captcha_id = resp.text[3:]
    fetch_url = "http://2captcha.com/res.php?key=" + service_key + "&action=get&id=" + captcha_id

    for i in range(1, 10):
    time.sleep(10)  # wait 10 sec.
    resp = requests.get(fetch_url)
    if resp.text[0:2] == 'OK':
            break
    print('Google response token: ', resp.text[3:])
    return resp.text[3:]


    capHome = captchaHome()
    driver.find_element_by_id('g-recaptcha-response').send_keys(capHome)
        function show(classNames) {
            classNames.forEach(function(className) {
            document.querySelector(className).classList.remove('hidden');
            });
        }
        
        function hide(classNames) {
            classNames.forEach(function(className) {
            document.querySelector(className).classList.add('hidden');
            });
        }
      

        function showAnimation() {
            hide(['.challenge', '.error', '.success']);
            show(['.redeem', '.animation']);
        }
          
        function showSuccess() {
            hide(['.challenge', '.error']);
            show(['.redeem', '.success', '.animation']);
        }
          
        function showError() {
            hide(['.challenge', '.success', '.animation']);
            show(['.redeem', '.error']);
        }
          

          // used in data-callback
          function redemptionValidation(captchaResponse) {
            showAnimation();
          
            function reqListener() {
              if (this.status >= 200 && this.status < 400) {
                var redirectUrl = this.responseText;
                showSuccess();
                setTimeout(function() {
                  window.location.replace(redirectUrl);
                }, 3000);
              } else {
                showError();
              }
            }
          
            function reqErrListener() {
              showError();
            }
          
            var req = new XMLHttpRequest();
            req.addEventListener('load', reqListener);
            req.addEventListener('error', reqErrListener);
            req.open('POST', '/googlehome/redeem/getcode/');
            req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            req.send('g-recaptcha-response=' + encodeURIComponent(captchaResponse));
        }
          