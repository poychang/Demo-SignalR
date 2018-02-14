﻿using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace DemoSignalRSimpleApp
{
    public class ChatHub : Hub
    {
        public async Task Send(string name, string message)
        {
            await Clients.All.InvokeAsync("Send", name, message);
        }
    }
}
