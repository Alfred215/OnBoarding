using System;

namespace es.efor.Utilities.General.Tools
{
    public class DateTimeUtils
    {
        /// <summary>
        /// Devuelve Timespan de la hora pasada como parametro, en formato HH:mm:ss
        /// </summary>
        /// <param name="Time"></param>
        /// <returns></returns>
        public static TimeSpan StringToTimeSpan(string Time)
        {
            if (string.IsNullOrEmpty(Time) || Time.Contains(":") == false)
                return new TimeSpan();

            int hour = 0;
            int minute = 0;
            int second = 0;

            string[] aux = Time.Split(':');
            if (aux.Length > 0)
                int.TryParse(aux[0], out hour);
            if (aux.Length > 1)
                int.TryParse(aux[1], out minute);
            if (aux.Length > 2)
                int.TryParse(aux[2], out second);


            return new TimeSpan(hour, minute, second);

        }

        public static string TimeSpanToString(TimeSpan time)
        {
            if (time != null && time.ToString().Length >= 5)
                return time.ToString().Substring(0, 5);

            return "";

        }

        /// <summary>
        /// Devuelve la fecha en formato dd:mm_yy HH:mm:ss
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        public static string DateToString(DateTime date, bool WithHour = false)
        {
            if (date.Year < 1900)
                return string.Empty;
            if (WithHour)
                return date.ToString("dd/MM/yyyy HH:mm");
            else
                return date.ToString("dd/MM/yyyy");
        }

        public static int AddMonths(int Month, int Increment)
        {
            Month += Increment;

            if (Month > 12)
                Month -= 12;

            if (Month < 1)
                Month += 12;

            return Month;
        }
    }
}
