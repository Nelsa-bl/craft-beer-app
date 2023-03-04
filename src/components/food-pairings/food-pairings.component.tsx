// Import components
import Button from '../button/button.component';

// Import styles
import './food-pairings.style.scss';

// types
type FoodPairingsProps = {
  foodPairingValues: string[];
  // setFoodPairingValues: Dispatch<React.SetStateAction<string[]>>;
  setFoodPairingValues: (newValues: string[]) => void;
};

const FoodPairings = ({
  foodPairingValues,
  setFoodPairingValues,
}: FoodPairingsProps) => {
  // Handle food paipring
  const handleFoodPairingChange = (index: number, value: string) => {
    // Create a copy of the current food pairing values array
    const newFoodPairingValues = [...foodPairingValues];

    // Update the value at the given index
    newFoodPairingValues[index] = value;

    // Update state with the new array
    setFoodPairingValues(newFoodPairingValues);
  };

  // Handle add food pairing
  const handleAddFoodPairing = () => {
    // Add a new empty string to the food pairing values array
    setFoodPairingValues([...foodPairingValues, '']);
  };

  // Handle remove food pairing
  const handleRemoveFoodPairing = (index: number) => {
    // Create a copy of the current food pairing values array
    const newFoodPairingValues = [...foodPairingValues];

    // Remove the value at the given index
    newFoodPairingValues.splice(index, 1);

    // Update state with the new array
    setFoodPairingValues(newFoodPairingValues);
  };

  return (
    <>
      {foodPairingValues.map((value, index) => (
        <div className='paring-container' key={index}>
          <label>
            Food Pairing {index + 1}:
            <input
              type='text'
              value={value}
              placeholder='Food dish that goes well with this beer'
              onChange={(event) =>
                handleFoodPairingChange(index, event.target.value)
              }
            />
          </label>
          <Button
            type='button'
            className='delete-line-btn'
            onClick={() => handleRemoveFoodPairing(index)}
          >
            ✖️
          </Button>
        </div>
      ))}
      <Button
        type='button'
        style={{ marginBottom: '10px' }}
        onClick={handleAddFoodPairing}
      >
        + Add Food Pairing
      </Button>
    </>
  );
};

export default FoodPairings;
