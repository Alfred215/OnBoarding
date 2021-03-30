using AutoMapper;
using es.efor.Utilities.General;
using es.efor.Utilities.Web.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;

namespace es.efor.Utilities.Web.Controllers
{
    public class BaseEforController : ControllerBase
    {
        public const string PREDETERMINED_HEADER_LANGCODE = "es";

        protected string UserLang => GetUserLang();
        protected Guid? UserId => GetUserId();
        protected readonly IAuthorizationService _authService;
        protected readonly IMapper _mapper;

        public BaseEforController(IAuthorizationService authService, IMapper mapper)
        {
            _authService = authService;
            _mapper = mapper;
        }

        protected BadRequestObjectResult BadRequestToast(string title, params string[] bodyMessages)
        {
            var asDictionary = new Dictionary<string, IEnumerable<string>>()
                .AddFluent("_title", new string[] { title })
                .AddFluent("_message", bodyMessages);
            return BadRequest(asDictionary);
        }
        protected BadRequestObjectResult BadRequest(string fieldName, params string[] errorMessages)
        {
            return BadRequest(new Dictionary<string, IEnumerable<string>>().AddFluent(fieldName, errorMessages));
        }
        protected BadRequestObjectResult BadRequest(Dictionary<string, string> fieldAndError)
        {
            return BadRequest(fieldAndError.ToDictionary(d => d.Key, d => new string[] { d.Value }.AsEnumerable()));
        }

        protected BadRequestObjectResult BadRequest(Dictionary<string, IEnumerable<string>> fieldAndErrors)
        {
            var modelState = new ModelStateDictionary();
            foreach (var fe in fieldAndErrors)
            {
                foreach (var e in fe.Value)
                {
                    modelState.AddModelError(fe.Key, e);
                }
            }

            return base.BadRequest(modelState);
        }

        /// <param name="modelState"></param>
        /// <param name="addGenericTitle">"No se ha podido procesar la petición"</param>
        /// <param name="addGenericBody">"Por favor, revise las validaciones de los campos"</param>
        /// <returns></returns>
        protected BadRequestObjectResult BadRequest([ActionResultObjectValue] ModelStateDictionary modelState,
            bool addGenericTitle, bool addGenericBody = true)
        {
            if (addGenericTitle)
            {
                modelState.AddModelError("_title", "API_ERROR_400_TITLE");
            }
            if(addGenericBody)
            {
                modelState.AddModelError("_message", "API_ERROR_400_BODY");
            }
            return base.BadRequest(modelState);
        }


        private Guid? GetUserId()
        {
            if (!User.Identity.IsAuthenticated) return null;
            var asString =  User.GetClaimId();

            if (string.IsNullOrWhiteSpace(asString)) return null;
            return Guid.Parse(asString);
        }

        private string GetUserLang()
        {
            string langCode = null;
            if (HttpContext.Request.Headers.TryGetValue("Lang", out var langCodeValues))
            {
                langCode = langCodeValues.FirstOrDefault();
            }

            if (string.IsNullOrWhiteSpace(langCode)) langCode = PREDETERMINED_HEADER_LANGCODE;
            return langCode;
        }
    }
}
