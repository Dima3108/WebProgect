using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Web;
using System.IO;
namespace WebApplicationProgect.Controllers
{
    public enum ErroCodesChat
    {
        Success=0,
        Empty_value=-1
    }
    public class Message
    {
        public string message { get; set; }
        public string author{get;set;}
        public string hesh { get; set; }
        public Message(string a,string m)
        {
            author = a;
            message = m;
            byte[] A = UnicodeEncoding.Unicode.GetBytes(author);
            byte[] M = UnicodeEncoding.Unicode.GetBytes(message);
            byte[] R = new byte[A.Length + M.Length];
            int i = 0;
            foreach (byte v in A)
                R[i++] = v;
            foreach (byte v in M)
                R[i++] = v;
            byte[] RH = sHA512.ComputeHash(R);
           
            hesh = Convert.ToBase64String(RH);
        }
        private static readonly SHA512 sHA512 = SHA512.Create();
    }

    public class ChatController : Controller
    {
        private static readonly SHA512 sHA512 = SHA512.Create();
        private class INT
        {
            public int Value { get; set; }
            public static implicit operator INT(int v)=>new INT { Value=v};
        }
        private static Message[] messages = new Message[1024];
        private static Message[] GetNotNULL(Message[] m)
        {
            List<Message> M = new List<Message>();
            foreach (var v in m)
                if (v is Message && v != null)
                    M.Add(v);
            return M.ToArray();
        }
        private static INT pos { get; set; } = 0;
        private static string TotalHesh { get; set; } = "@";
        private static string UpdateTotalHesh()
        {
            string h = "@";
            lock(messages)
            {
                using (MemoryStream mem = new MemoryStream())
                {


                    foreach (Message m in messages)
                        if (m is Message && m != null)
                        {
                            byte[] b = Convert.FromBase64String(m.hesh);
                            mem.Write(b,0,b.Length);

                        }
                    h =Convert.ToBase64String( sHA512.ComputeHash(mem));
                }
            }
            lock (TotalHesh)
            {
                TotalHesh = h;
            }
            return h;
        }
 private static int ToInt(ErroCodesChat codes) => (int)codes;
        private static readonly JsonSerializerOptions jsonSerializerOptions = new JsonSerializerOptions { WriteIndented = true };
        [HttpGet]
        public int ReadMessage(string user,string message)
        {
            Console.WriteLine($"user:{user},comment:{message}");
            if (user == null || message == null || user.Length < 0 || message.Length < 0)
                return ToInt(ErroCodesChat.Empty_value);
            Message message1 = new Message(user, message);
            lock (messages)
            { 
                lock (pos)
                {
                    if (pos.Value >= message.Length)
                        pos.Value = 0;
                    messages[pos.Value++] = message1;
                    TotalHesh = UpdateTotalHesh();
                }
            }
#if DEBUG
           
            
            Console.WriteLine(JsonSerializer.Serialize(GetNotNULL(messages), jsonSerializerOptions));
#endif
            return ToInt(ErroCodesChat.Success);
        }
        [HttpGet]
        public bool IsUpdate(string hesh)
        {
            var current = TotalHesh;
            return current != hesh;
        }
        [HttpGet]
        public string GetCurrentHesh()
        {
            return TotalHesh;
        }
        [HttpPost]
        public string GetMessages()
        {

            return JsonSerializer.Serialize(GetNotNULL(messages),jsonSerializerOptions);
        }
    }
}
