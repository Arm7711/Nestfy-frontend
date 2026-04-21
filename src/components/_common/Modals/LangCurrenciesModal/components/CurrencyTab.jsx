import CurrencyItem from './CurrencyItem';
import { CURRENCIES } from '../../../../../data/currenciesData';

export default function CurrencyTab({ selectedCurr, onSelect }) {
  return (
    <div>
      <div className="section_title">Choose a currency</div>
      <div className="currency_grid">
        {CURRENCIES.map((curr,index) => (
          <CurrencyItem
            key={curr.name}
            name={curr.name}
            code={curr.code}
            index={selectedCurr === curr.name ? 0 : index}
            isActive={selectedCurr === curr.name}
            onClick={() => onSelect(curr.name)}
          />
        ))}
      </div>
    </div>
  );
}