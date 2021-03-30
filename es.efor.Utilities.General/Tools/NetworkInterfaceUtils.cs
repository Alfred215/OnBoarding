using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.NetworkInformation;
using System.Text;

namespace es.efor.Utilities.General.Tools
{
    public class NetworkInterfaceUtils
    {
        public static NetworkInformation GetNetworkInformation(NetworkInterfaceType? interfaceType = null, OperationalStatus? operationalStatus = null)
        {
            var hostName = Dns.GetHostName();
            var interfaces = NetworkInterface.GetAllNetworkInterfaces()
                .Where(c => (!interfaceType.HasValue || c.NetworkInterfaceType == interfaceType) &&
                    (!operationalStatus.HasValue || c.OperationalStatus == operationalStatus))
                .ToList();

            var result = new NetworkInformation(hostName, interfaces);
            return result;
        }




        public class NetworkInformation
        {
            public string HostName { get; set; }
            public IEnumerable<NetworkInterfaceInformation> Interfaces { get; set; } = Enumerable.Empty<NetworkInterfaceInformation>();

            public NetworkInformation() { }
            internal NetworkInformation(string dnsHostname, IEnumerable<NetworkInterface> interfaces)
            {
                HostName = dnsHostname;
                Interfaces = (interfaces ?? Enumerable.Empty<NetworkInterface>())
                    .Select(i => new NetworkInterfaceInformation(i))
                    .ToList().AsReadOnly();
            }
        }
        public class NetworkInterfaceInformation
        {
            public string Name { get; set; }
            public string Description { get; set; }
            public NetworkInterfaceType Type { get; set; }
            public OperationalStatus Status { get; set; }
            public IPAddress IPv4 { get; set; }

            public NetworkInterfaceInformation() { }
            internal NetworkInterfaceInformation(NetworkInterface i)
            {
                var props = i.GetIPProperties();
                var ipv4 = props.UnicastAddresses
                    .Where(a => a.Address.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork)
                    .Select(a => a.Address)
                    .FirstOrDefault();

                Name = i.Name;
                Description = i.Description;
                Type = i.NetworkInterfaceType;
                Status = i.OperationalStatus;
                IPv4 = ipv4;
            }
        }
    }
}
