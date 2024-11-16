using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Combination.BLL.Services
{
    public class CombinationService
    {
        private int? _n;
        private long? _totalCombinations;

        public void SetN(int n)
        {
            _n = n;
        }

        public int? GetN()
        {
            return _n;
        }
        public void SetTotalCombinations(long number)
        {
            _totalCombinations = number;
        }

        public long? GetTotalCombinations()
        {
            return _totalCombinations;
        }

    }
}
