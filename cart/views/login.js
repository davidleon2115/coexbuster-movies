//verificacion de usuario en el login
import '../stylelogin.css'
const IconSrc = '../../assets/icons';

const templatelogin=`
<header class="topbar">
  <a href="../../index.html" class="topbar__link" type="button">
      <img src="${IconSrc}/logo_coexbuster.svg" alt="logo_coexbuster" class="logo">
  </a>
</header>
<br>
<div class="login">
  <form id="form_login">
    <div class="login-info">
      <label class="text_login">Email Adress</label><br>
      <input class="input_login" type="email" id="email" placeholder="correo@correo.com"><br>
      <label class="text_login">Password</label><br>
      <input class="input_login" type="password" id="password" placeholder="***********" autocomplete="off"><br>
      <button class="btn-login" type="submit">Log in</button>
    </div>
  </form>
</div>
<div class="extra_login">
  <label class="forgot">forgot my passsword</label>
  <br>
  <button class="btn-singup" type="submit" href="#">Sin up</button>
</div>
`;export default templatelogin

