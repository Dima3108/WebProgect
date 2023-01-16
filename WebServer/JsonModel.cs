using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebServer
{
    public class JsonModel
    {
        public string author { get; set; }
        public string comment { get; set; }
    }
    public static class JsonData
    {
        public static JsonModel[] Create()
        {
            JsonModel[] m = new JsonModel[2048];
            Random random = new Random();
            for(int i = 0; i < m.Length; i++)
            {
                int v = random.Next();
                m[i] = new JsonModel { author = "автор#" + v.ToString(), comment = "комментарий#" + v.ToString() };
            }
            return m;
        }
    }
}
