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
using System.Collections;

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
        public string label { get; set; }
        public Message(string a,string m,string l)
        {
            author = a;
            message = m;
            label = l;
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
        public Message()
        {

        }
        private static readonly SHA512 sHA512 = SHA512.Create();
    }
    public class UsFile
    {
        public UsFile() { }
        public UsFile(string f,byte[] c)
        {
          //  user = s;
            fname = f;
            content = c;
        }
        public UsFile(string f, char[] c,string lab)
        {
            fname = f;
            content = new byte[c.Length];
            label = lab;
            for(int i = 0; i < c.Length; i++)
            {
                content[i] = (byte)c[i];
            }
        }
       // public string user { get; set; }
        public string fname { get; set; }
        public byte[] content { get; set; }
        public string label { get; set; }
    }
    public class ChatController : Controller
    {
        private static readonly SHA256 sHA = SHA256.Create();
        private class INT
        {
            public int Value { get; set; }
            public static implicit operator INT(int v)=>new INT { Value=v};
            public static implicit operator int(INT v)=>v.Value;
            public static INT operator +(INT x, int y) => new INT { Value = x.Value + y };
            public static INT operator -(INT x, int y) => new INT { Value = x.Value - y };
        }
        private static Message[] messages = new Message[1024];
        private static Message[] GetNotNULL(Message[] m)
        {
            List<Message> M = new List<Message>();
            foreach (var v in m)
                if (v is Message && v != null)
                   // if(v.author!=null&&v.author.Length>0)
                    M.Add(v);
            return M.ToArray();
        }
        public ChatController()
        {
           /* for (int i = 0; i < messages.Length; i++)
                messages[i] = new Message();*/
            for (int i = 0; i < files.Length; i++)
                files[i] = new UsFile();
        }
        private static INT pos { get; set; } = 0;
        private static string TotalHesh { get; set; } = "@";
        private static string UpdateTotalHesh()
        {
            string h = "@";
            var d = DateTime.Now;
            h += d.ToString() + ":" + d.TimeOfDay.Milliseconds.ToString();
            return h;
            

           
        }
 private static int ToInt(ErroCodesChat codes) => (int)codes;
        private static readonly JsonSerializerOptions jsonSerializerOptions = new JsonSerializerOptions { WriteIndented = true };
        [HttpGet]
        public int ReadMessage(string user,string message,string label)
        {
            //Console.WriteLine($"user:{user},comment:{message}");
            if (user == null || message == null || user.Length < 0 || message.Length < 0)
                return ToInt(ErroCodesChat.Empty_value);
            Message message1 = new Message(user, message,label);
            int i;
            lock (pos)
            {
               // pos++;
                if (pos.Value >= messages.Length)
                    pos.Value = 0;
               i= pos.Value++;
                // messages[pos.Value++] = message1;
                 //   Console.WriteLine(pos.Value.ToString() + "^^^^^");
            }
            lock (messages)
            {

                messages[i] = message1;
                /* lock (pos)
                 {
                     if (pos.Value >= message.Length)
                         pos.Value = 0;
                     messages[pos.Value++] = message1;


                 }*/
               /* messages[i].author = message1.author;
                messages[i].hesh = message1.hesh;
                messages[i].label = message1.label;
                messages[i].message = message1.message;*/
            }
            lock (TotalHesh)
                    {
TotalHesh = UpdateTotalHesh();
#if false
                Console.WriteLine(TotalHesh);
#endif
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
            var k = new Message[] { };
            lock (messages)
            {
             k=     GetNotNULL(messages);
            }
          
            string f= JsonSerializer.Serialize(k,jsonSerializerOptions);
#if DEBUG
            Console.WriteLine($"#{f}-----------------{k.Length}");

#endif
            return f;
        }
        //private static Dictionary<string, List<UsFile>> files_storage = new Dictionary<string, List<UsFile>>();
        private static INT dicPos = 0;
        private const int max_userf_count = 20;
        private const int max_file_count = 3;
        private static UsFile[] files = new UsFile[max_userf_count * max_file_count];
        [HttpGet]
        public string GetTime()
        {
            DateTime dateTime = DateTime.Now;
            return dateTime.TimeOfDay.ToString();
        }
        [HttpPost]
        public int WriteFileToServer(string label,string f_name,string content)
        {
            /*if (us_name == null || f_name == null || content == null)
                return -1;
            if (us_name.Length <= 0 || f_name.Length <= 0 || content.Length <= 0)
                return -2;*/
            UsFile usFile = new UsFile( f_name,content.ToCharArray(),label);
            Console.WriteLine($"user:{label},file:{f_name},content-len{content.Length}");
            int i;
            lock (dicPos)
            {
                dicPos.Value++;
                if (dicPos.Value > files.Length)
                {
                    dicPos = 0;
                }
                i = dicPos;
            }
            lock (files[i])
            {
                files[i].content = usFile.content;
                files[i].fname = usFile.fname;
                files[i].label = usFile.label;
            }
            return 0;
        }
    }
}
