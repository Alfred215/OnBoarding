using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace es.efor.Utilities.General.Tools
{
    public static class AppUtils
    {
        private static System.Diagnostics.Process _CurrentProcess { get; set; }
        public static AppInformation GetCurrentAppInformation()
        {
            if (_CurrentProcess == null) { try { _CurrentProcess = System.Diagnostics.Process.GetCurrentProcess(); } catch (Exception) { } }
            return new AppInformation()
            {
                FrameworkVersion = Environment.Version,
                AppName = _CurrentProcess.ProcessName,
                ProcessId = _CurrentProcess.Id.ToString(),
            };
        }


        public static void PrintAppAndNetworkInfo()
        {
            var appInfo = AppUtils.GetCurrentAppInformation();
            Console.WriteLine($"[{DateTime.Now}] {appInfo.AppName}");
            Console.WriteLine($"Net Core: v{appInfo.FrameworkVersion}");

            int ipColSize = (3 * 4) + 3;
            var networkInfo = NetworkInterfaceUtils.GetNetworkInformation(null, System.Net.NetworkInformation.OperationalStatus.Up);
            var interfaces = networkInfo.Interfaces
                .Where(i => i.Type != System.Net.NetworkInformation.NetworkInterfaceType.Loopback)
                .ToList();

            Console.WriteLine($"Hostname: {networkInfo.HostName}");
            foreach (var i in interfaces)
            {
                Console.WriteLine($"    {i.IPv4.ToString().PadRight(ipColSize, ' ')} | {i.Name}");
            }
        }
    }

    public class AppInformation
    {
        public string ProcessId { get; set; }
        public string AppName { get; set; }
        //public Version AppVersion { get; set; }
        public Version FrameworkVersion { get; set; }
    }
}
