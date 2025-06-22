import { useState , useEffect} from 'react';

const Sort = (props) => {
    const [sortOptions, setSortOptions] = useState([
        { field: '', order: false },
        { field: '', order: false },
        { field: '', order: false }
    ]);

    useEffect(() => {
        if (props.resetTrigger) {
          setSortOptions([
            { field: '', order: false },
            { field: '', order: false },
            { field: '', order: false }
          ]);
        }
      }, [props.resetTrigger]);
    
      //перенес handleSort
      const handleSort = () => {
        const activeSorts = sortOptions.filter(opt => opt.field !== '');
        if (activeSorts.length === 0) return;

        const sortedData = [...props.data].sort((a, b) => {
            for (const option of activeSorts) {
                const { field, order } = option;
                let compareResult = 0;
                if (field === "Год выпуска" || field === "Количество серий") {
                    compareResult = a[field] - b[field];
                } else {
                    const valA = String(a[field]).toLowerCase();
                    const valB = String(b[field]).toLowerCase();
                    compareResult = valA.localeCompare(valB);
                }
                if (compareResult !== 0) {
                    return order ? -compareResult : compareResult;
                }
            }
            return 0;
        });
        props.onSort(sortedData);
    };

    const handleFieldChange = (index, value) => {
        const newOptions = [...sortOptions];
        newOptions[index].field = value;
        //сброс уровней при изменении текущего
        for (let i = index + 1; i < newOptions.length; i++) {
            newOptions[i] = { field: '', order: false };
        }
        setSortOptions(newOptions);
    };

    const handleOrderChange = (index, checked) => {
        const newOptions = [...sortOptions];
        newOptions[index].order = checked;
        setSortOptions(newOptions);
    };

    const handleReset = () => {
        setSortOptions([
            { field: '', order: false },
            { field: '', order: false },
            { field: '', order: false }
        ]);
        props.onReset();
    };

    //изменяем доступный выбор
    const getAvailableColumns = (index) => {
        const usedFields = sortOptions.slice(0, index).map(opt => opt.field);
        return props.columns.filter(col => !usedFields.includes(col));
    };

    return (
        <details>
            <summary>Сортировка</summary>
            <form>
                <p>Сортировать по</p>
                
                {sortOptions.map((option, index) => (
                    <p key={`sort-${index}`}>
                        <select 
                            value={option.field}
                            onChange={(e) => handleFieldChange(index, e.target.value)}
                            disabled={index > 0 && !sortOptions[index-1].field}
                        >
                            <option value="">Нет</option>
                            {getAvailableColumns(index).map((col, i) => (
                                <option key={`col-${i}`} value={col}>
                                    {col}
                                </option>
                            ))}
                        </select>
                        по убыванию? 
                        <input 
                            type="checkbox" 
                            checked={option.order}
                            onChange={(e) => handleOrderChange(index, e.target.checked)}
                        />
                    </p>
                ))}
                
                <button type="button" onClick={handleSort}>
                    Сортировать
                </button>
                <button type="button" onClick={handleReset}>
                    Сбросить сортировку
                </button>
            </form>
        </details>
    );
};

export default Sort;