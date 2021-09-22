<template>
  <div>
    Auth
    <a href="/api/auth/discord">Discord</a> |
    <a href="/api/auth/google">Google</a> |
    <a href="/api/auth/steam">Steam</a> |

    <div class="wit-flex">
      <p>1</p>
      <p>2</p>
    </div>

    <div class="account-pages my-5 pt-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6 col-xl-4">
            <div class="card overflow-hidden">
              <div class="bg-primary">
                <div class="text-primary text-center p-4">
                  <h5 class="text-white font-size-20">
                    Welcome Back !
                  </h5>
                  <p class="text-white-50">
                    Sign in to continue to Veltrix.
                  </p>
                  <a href="index.html" class="logo logo-admin">
                    <img src="assets/images/logo-sm.png" height="24" alt="logo">
                  </a>
                </div>
              </div>

              <div class="card-body p-4">
                <div class="p-3">
                  <form class="mt-4" action="index.html">
                    <div class="mb-3">
                      <label class="form-label" for="username">Username</label>
                      <input id="username" type="text" class="form-control" placeholder="Enter username">
                    </div>

                    <div class="mb-3">
                      <label class="form-label" for="userpassword">Password</label>
                      <input id="userpassword" type="password" class="form-control" placeholder="Enter password">
                    </div>

                    <div class="mb-3 row">
                      <div class="col-sm-6">
                        <div class="form-check">
                          <input id="customControlInline" type="checkbox" class="form-check-input">
                          <label class="form-check-label" for="customControlInline">Remember me</label>
                        </div>
                      </div>
                      <div class="col-sm-6 text-end">
                        <button class="btn btn-primary w-md waves-effect waves-light" type="submit">
                          Log In
                        </button>
                      </div>
                    </div>

                    <div class="mt-2 mb-0 row">
                      <div class="col-12 mt-4">
                        <a href="pages-recoverpw.html"><i class="mdi mdi-lock" /> Forgot your password?</a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div class="mt-5 text-center">
              <p>Don't have an account ? <a href="pages-register.html" class="fw-medium text-primary"> Signup now </a> </p>
              <p class="mb-0">
                © <script>document.write(new Date().getFullYear())</script>2021 Veltrix. Crafted with <i class="mdi mdi-heart text-danger" /> by Themesbrand
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
@import "assets/styles/auth.css";
</style>
