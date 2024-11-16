using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Combination.BLL.Interfaces
{
    public interface ICombinationBL
    {
        long CalcTotalCombinations(int n);
        List<int[]> GetCombinationsByPage(int pageIndex, int pageSize);
        int[] GetNextCombination(int index);


    }
}
