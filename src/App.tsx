import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

type SortType = 'alphabetically' | 'length' | null;

export const App: React.FC = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [sortType, setSortType] = useState<SortType>(null);
  const [isReversed, setIsReversed] = useState(false);

  const sortGoods = (type: SortType) => {
    const sortedGoods = [...goodsFromServer];

    if (type === 'alphabetically') {
      sortedGoods.sort();
    } else if (type === 'length') {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sortedGoods.reverse();
    }

    setGoods(sortedGoods);
    setSortType(type);
  };

  const reverseGoods = () => {
    setGoods([...goods].reverse());
    setIsReversed(!isReversed);
  };

  const resetGoods = () => {
    setGoods(goodsFromServer);
    setSortType(null);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alphabetically' ? '' : 'is-light'}`}
          onClick={() => sortGoods('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === 'length' ? '' : 'is-light'}`}
          onClick={() => sortGoods('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {(sortType || isReversed) && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
