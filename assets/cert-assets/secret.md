---
layout: secret
permalink: /🔑/
title: 🔑
# title: Secret
---

<div class="article-list" style="display: flex; align-items: center; justify-content: center; flex-direction: column;">
    <a class="none" href="{{site.baseurl}}/">
        <img id="mode-logo" src="/black-logo.png" alt="Logo" style="width: 400px;">
    </a>
    <input align="center" type="password" id="password" class="password" name="password" placeholder="Password">
    <p align="center">
        <button class="simplebutton" id="submit-button"><i class="fa-solid fa-user-secret"></i></button>
    </p>
</div>

<script>
    document.getElementById('submit-button').addEventListener('click', function() {
        var passwordInput = document.getElementById('password');
        var password = document.getElementById('password').value;
        var button = document.getElementById('submit-button');

        if (button.getAttribute('data-redirect') === 'true') {
            window.location.href = '{{site.baseurl}}/💻/';
            return;
        }

        if (password === '400391211') {
            passwordInput.style.color = '';
            passwordInput.value = '';
            passwordInput.placeholder = 'welcome back Kevin Pratama !';
            // window.location.href = '{{site.baseurl}}/';
            passwordInput.style.borderBottom = '3px solid green';
            passwordInput.style.fontFamily = 'JetBrains Mono, monospace';
            button.textContent = "Access Granted!";
            button.style.fontFamily = 'JetBrains Mono, monospace';
            button.setAttribute('data-redirect', 'true');
        } else {
            passwordInput.value = '';
            passwordInput.placeholder = 'Access Denied!';
            passwordInput.style.borderBottom = '3px solid red';
        }
    });
</script>