using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace es.efor.Utilities.Web.Models.Identity
{
    public class AccountLoginRequest
    {
        [Required(ErrorMessage = "ERR_AUTH_USERNAME_EMPTY")]
        public string Username { get; set; }
        [Required(ErrorMessage = "ERR_AUTH_PASSWORD_EMPTY")]
        public string Password { get; set; }
        [DefaultValue(false)]
        public bool RememberMe { get; set; }
    }
}
