document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('signup-form');
    var nameInput = document.getElementById('name');
    var emailInput = document.getElementById('email');
    var ageInput = document.getElementById('age');
    var passwordInput = document.getElementById('password');
    var confirmPasswordInput = document.getElementById('confirm-password');
    var submitButton = document.getElementById('submit-button');
    var nameSuccessMessage = document.createElement('small');
    var emailErrorMessage = document.createElement('small');
    var emailSuccessMessage = document.createElement('small');
    var ageErrorMessage = document.getElementById('age-error-message');

    nameSuccessMessage.style.color = 'green';
    nameSuccessMessage.style.display = 'none';
    nameInput.insertAdjacentElement('afterend', nameSuccessMessage);

    emailErrorMessage.style.color = 'red';
    emailErrorMessage.style.display = 'none';
    emailInput.insertAdjacentElement('afterend', emailErrorMessage);

    emailSuccessMessage.style.color = 'green';
    emailSuccessMessage.style.display = 'none';
    emailInput.insertAdjacentElement('afterend', emailSuccessMessage);

    ageErrorMessage.style.color = 'red';
    ageErrorMessage.style.display = 'none';
    ageInput.insertAdjacentElement('afterend', ageErrorMessage);

    var ageSuccessMessage = document.createElement('small');
    ageSuccessMessage.style.color = 'green';
    ageSuccessMessage.style.display = 'none';
    ageInput.insertAdjacentElement('afterend', ageSuccessMessage);

    var passwordSuccessMessage = document.createElement('small');
    passwordSuccessMessage.style.color = 'green';
    passwordSuccessMessage.style.display = 'none';
    passwordInput.insertAdjacentElement('afterend', passwordSuccessMessage);

    var confirmPasswordSuccessMessage = document.createElement('small');
    confirmPasswordSuccessMessage.style.color = 'green';
    confirmPasswordSuccessMessage.style.display = 'none';
    confirmPasswordInput.insertAdjacentElement('afterend', confirmPasswordSuccessMessage);

    function showSuccessModal() {
        var modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.left = '0';
        modal.style.top = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.innerHTML = `
            <div style="width: 630px; height: 200px; background: white; padding: 70px 0px 0px 0px; border-radius: 10px; text-align: center; position: relative;">
                <h2>가입 성공!</h2>
                <p>umc 챌린저 가입을 축하합니다!</p>
                <button style="position: absolute; bottom: 20px; right: 20px; background-color: #E6E6E6;
                ; color: black; border: none; border-radius: 5px; padding: 8px 20px; cursor: pointer;">닫기</button>

            </div>
        `;
        modal.querySelector('button').addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        document.body.appendChild(modal);
    }

    function validateInput() {
        var isValid = true;
        nameSuccessMessage.style.display = 'none';
        emailErrorMessage.style.display = 'none';
        emailSuccessMessage.style.display = 'none';
        ageErrorMessage.style.display = 'none';

        if (nameInput.value.trim() === '') {
            nameSuccessMessage.style.display = 'none';
            nameInput.nextElementSibling.innerText = '필수 입력 항목입니다!';
            nameInput.nextElementSibling.style.display = 'block';
            isValid = false;
        } else {
            nameSuccessMessage.innerText = '멋진 이름이네요!';
            nameSuccessMessage.style.display = 'block';
        }

        var emailValue = emailInput.value.trim();
        if (emailValue === '') {
            emailErrorMessage.innerText = '이메일을 입력해주세요.';
            emailErrorMessage.style.display = 'block';
            isValid = false;
        } else {
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailValue)) {
                emailErrorMessage.innerText = '올바른 이메일 형식이 아닙니다.';
                emailErrorMessage.style.display = 'block';
                isValid = false;
            } else {
                emailErrorMessage.style.display = 'none';
                emailSuccessMessage.innerText = '올바른 이메일 형식입니다!';
                emailSuccessMessage.style.display = 'block';
            }
        }

        var ageValue = ageInput.value.trim();
        if (ageValue === '') {
            ageErrorMessage.innerText = '나이를 입력해주세요!';
            ageErrorMessage.style.display = 'block';
            ageSuccessMessage.style.display = 'none';
            isValid = false;
        } else if (isNaN(ageValue) || parseFloat(ageValue) !== parseInt(ageValue, 10)) {
            ageErrorMessage.innerText = '나이는 소수가 될 수 없습니다!';
            ageErrorMessage.style.display = 'block';
            ageSuccessMessage.style.display = 'none';
            isValid = false;
        } else {
            var age = parseInt(ageValue, 10);
            if (age < 0) {
                ageErrorMessage.innerText = '나이는 음수가 될 수 없습니다!';
                ageErrorMessage.style.display = 'block';
                ageSuccessMessage.style.display = 'none';
                isValid = false;
            } else if (age < 18) {
                ageErrorMessage.innerText = '18세 이상만 가입 가능합니다!';
                ageErrorMessage.style.display = 'block';
                ageSuccessMessage.style.display = 'none';
                isValid = false;
            } else {
                ageErrorMessage.style.display = 'none';
                ageSuccessMessage.innerText = '올바른 나이 형식입니다!';
                ageSuccessMessage.style.display = 'block';
            }
        }
    
        var password = passwordInput.value;
        var confirmPassword = confirmPasswordInput.value;
        var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{4,12}$/;

        if (password === '') {
            document.getElementById('password-error-message').innerText = '비밀번호를 입력해주세요!';
            document.getElementById('password-error-message').style.display = 'block';
            isValid = false;
        } else if (!passwordRegex.test(password)) {
            document.getElementById('password-error-message').innerText = '비밀번호는 영문, 숫자, 특수문자 조합의 4~12자리여야 합니다.';
            document.getElementById('password-error-message').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('password-error-message').style.display = 'none';
            passwordSuccessMessage.innerText = '올바른 비밀번호입니다!';
            passwordSuccessMessage.style.display = 'block';
        }


        if (confirmPassword === '') {
            document.getElementById('confirm-password-error-message').innerText = '비밀번호 확인란을 입력해주세요!';
            document.getElementById('confirm-password-error-message').style.display = 'block';
            isValid = false;
        } else if (password !== confirmPassword) {
            document.getElementById('confirm-password-error-message').innerText = '비밀번호가 일치하지 않습니다.';
            document.getElementById('confirm-password-error-message').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('confirm-password-error-message').style.display = 'none';
            confirmPasswordSuccessMessage.innerText = '비밀번호가 일치합니다!';
            confirmPasswordSuccessMessage.style.display = 'block';
        }


        submitButton.disabled = !isValid;
    }

    [nameInput, emailInput, ageInput, passwordInput, confirmPasswordInput].forEach(function(input) {
        input.addEventListener('input', validateInput);
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        validateInput();
        if (!submitButton.disabled) {
            showSuccessModal();
        }
    });
});
