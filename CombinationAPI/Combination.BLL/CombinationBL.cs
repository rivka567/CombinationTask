using Combination.BLL.Interfaces;
using Combination.BLL.Services;
using Microsoft.Extensions.Logging;

namespace Combination.BLL
{
    public class CombinationBL : ICombinationBL
    {
        private readonly CombinationService _combinationService;
        private readonly ILogger<CombinationBL> _logger;

        public CombinationBL(CombinationService combinationService, ILogger<CombinationBL> logger)
        {
            _combinationService = combinationService;
            _logger = logger;
        }

        public long CalcTotalCombinations(int n)
        {
            if (n < 1 || n > 20)
                throw new ArgumentException("Value of n must be between 1 and 20.");

            _combinationService.SetN(n);

            long result = 1;
            for (int i = 2; i <= n; i++)
                result *= i;

            _combinationService.SetTotalCombinations(result);

            return result;
        }

        public List<int[]> GetCombinationsByPage(int pageIndex, int pageSize)
        {
            var n = _combinationService.GetN() ?? throw new InvalidOperationException("Value of n is not set.");
            var total = _combinationService.GetTotalCombinations() ?? throw new InvalidOperationException("Total combinations is not set.");

            var start = pageIndex * pageSize;
            var end = start + pageSize <= total ? start + pageSize : total;

            var result = new List<int[]>();
            for (var i = start; i < end; i++)
                result.Add(GenerateCombination(i , n, total));

            return result;
        }

        public int[] GetNextCombination(int index)
        {
            var n = _combinationService.GetN() ?? throw new InvalidOperationException("Value of n is not set.");
            var total = _combinationService.GetTotalCombinations() ?? throw new InvalidOperationException("Total combinations is not set.");

            return GenerateCombination(index, n, total);
        }

        private int[] GenerateCombination(int index, int n, long factor)
        {
            var elements = new List<int>();
            for (int i = 1; i <= n; i++)
                elements.Add(i);

            var result = new int[n];
            var castIndex= (long)index--;

            for (var i = 0; i < n; i++)
            {
                factor /= (n - i);
                var selectedIndex = (int)(castIndex / factor);
                result[i] = elements[selectedIndex];
                elements.RemoveAt(selectedIndex);
                castIndex %= factor;
            }
            return result;
        }
    }
}
