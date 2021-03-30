using System;
using System.Collections.Generic;
using System.Text;

namespace es.efor.OnBoarding.Business.DTO.AuthDTOs
{
    public class LoginResponseDTO
    {
        #region Propiedades públicas
        public string token { get; set; }
        public DateTime expiration { get; set; }
        #endregion

        #region Constructores
        public LoginResponseDTO() { }
        public LoginResponseDTO(string _token, DateTime _expiration)
        {
            token = _token;
            expiration = _expiration;
        }
        #endregion
    }
}
