using System;
using System.IO;

namespace es.efor.Utilities.General.Tools
{

    public class FileUtil
    {
        /// <summary>
        /// Base 64 Encode Europ
        /// </summary>
        /// <param name="plainText"></param>
        /// <returns></returns>
        public static string Base64Encode(string plainText)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }

        /// <summary>
        /// Base 64 Decode Europ
        /// </summary>
        /// <param name="base64EncodedData"></param>
        /// <returns></returns>
        public static string Base64Decode(string base64EncodedData)
        {
            var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
            return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
        }

        /// <summary>
        /// Devuelve una ruta de fichero valida. Si el fichero existe, añade sufijo.
        /// </summary>
        /// <param name="BasePath">Dirección fisica completa de la ruta donde se guarda el fichero: c:/ </param>
        /// <param name="FileName">Nombre del fichero, con extensión</param>
        /// <param name="FullFileSavePath">Ruta completa donde se guardará el fichero. Incluye nombre de fichero.</param>
        public static void GetValidFilePath(string BasePath, string FileName, ref string FullFileSavePath)
        {
            //si hay duplicados, añadimos un random al nombre hasta que no esté repetido
            while (System.IO.File.Exists(FullFileSavePath))
            {
                Random r = new Random();
                int rInt = r.Next(0, 100); //for ints
                FullFileSavePath = System.IO.Path.Combine(BasePath, System.IO.Path.GetFileNameWithoutExtension(FileName) + rInt.ToString() + System.IO.Path.GetExtension(FileName)).Replace("'\'", "/");
            }
        }

        /// <summary>
        /// Devuelve sufijo de fichero. No es aleatorio
        /// </summary>
        /// <param name="FilePath"></param>
        /// <returns></returns>
        public static int GetFileNameSuffix(string FilePath)
        {
            string FinalDestinationPath = FilePath;
            int Suffix = 1;
            while (System.IO.File.Exists(FinalDestinationPath))
            {
                Suffix++;
                FinalDestinationPath = String.Format("{0}_{1}.{2}", System.IO.Path.GetFileNameWithoutExtension(FilePath), Suffix, System.IO.Path.GetExtension(FilePath));
            }

            return Suffix;
        }

        public static string AddToFileName(string FilePath, string Suffix)
        {
            return Path.Combine(System.IO.Path.GetDirectoryName(FilePath),
                                String.Concat(System.IO.Path.GetFileNameWithoutExtension(FilePath),
                                  Suffix,
                                  System.IO.Path.GetExtension(FilePath)));
        }


        /// <summary>
        /// Comprueba longitud máxima permitida de un fichero
        /// </summary>
        /// <param name="FilePath"></param>
        /// <param name="HighestFileLength"></param>
        /// <returns></returns>
        public static bool CheckFileLength(string FilePath, long HighestFileLength)
        {
            try
            {
                System.IO.FileInfo File = new System.IO.FileInfo(FilePath);

                if (File.Length <= HighestFileLength)
                {
                    return true;
                }
            }
            catch (Exception)
            {

            }
            return false;
        }
    }
}