import {Star} from "lucide-react"


const RatingStars_B = ({rating}: {rating: number}) => {
  return Array.from({length: 5}).map((_, index) => {
    const difference = rating - index
    let fillPercentage = 0

    if (difference >= 1) {
      fillPercentage = 100
    } else if (difference > 0) {
      fillPercentage = Math.round(difference * 100)
    }

    return (
      <div key={index} className="relative">
        <Star className="h-5 w-5 text-gray-300" />
        {fillPercentage > 0 && (
          <div
            className="absolute inset-0 overflow-hidden"
            style={{width: `${fillPercentage}%`}}
          >
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          </div>
        )}
      </div>
    )
  })
}

// export default RatingStars;


interface RatingStarsProps {
  rating: number;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
}

const RatingStars = ({rating, onChange, readOnly = false}: RatingStarsProps) => {
  return (
    <div className="flex gap-1">
      {Array.from({length: 5}).map((_, index) => {
        const difference = rating - index;
        let fillPercentage = 0;

        if (difference >= 1) {
          fillPercentage = 100;
        } else if (difference > 0) {
          fillPercentage = Math.round(difference * 100);
        }

        const handleClick = () => {
          if (!readOnly && onChange) {
            onChange(index + 1); // Stars are 1-indexed visually
          }
        };

        return (
          <div
            key={index}
            className={`relative cursor-${readOnly ? "default" : "pointer"}`}
            onClick={handleClick}
          >
            <Star className="h-5 w-5 text-gray-300" />
            {fillPercentage > 0 && (
              <div
                className="absolute inset-0 overflow-hidden"
                style={{width: `${fillPercentage}%`}}
              >
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RatingStars;
