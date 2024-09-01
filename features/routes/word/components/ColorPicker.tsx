import { ColorResult, SketchPicker } from "react-color";
import { ColorPickerProps } from "../types/word";

const ColorPicker: React.FC<ColorPickerProps> = ({
  highlightColor,
  displayColorPicker,
  onColorChange,
  onApplyHighlight,
  onReset,
  onTogglePicker,
}) => (
  <div className="relative mt-2 inline-flex items-center">
    <div
      onClick={onTogglePicker}
      className="inline-flex items-center justify-center px-2 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      style={{
        backgroundColor: highlightColor,
        cursor: "pointer",
        width: "30px",
        height: "30px",
      }}
    />
    <button
      type="button"
      onClick={onApplyHighlight}
      className="ml-2 inline-flex items-center justify-center px-2 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      style={{ height: "30px", width: "70px" }}
    >
      Apply
    </button>
    <button
      type="button"
      onClick={onReset}
      className="ml-2 inline-flex items-center justify-center px-2 py-2 border border-red-600 text-sm font-medium rounded-md text-red-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      style={{ height: "30px", width: "70px" }}
    >
      Reset
    </button>
    {displayColorPicker && (
      <div style={{ position: "absolute", zIndex: 2, top: "100%", left: 0 }}>
        <div
          style={{ position: "fixed", top: 0, right: 0, bottom: 0, left: 0 }}
          onClick={onTogglePicker}
        />
        <SketchPicker color={highlightColor} onChange={onColorChange} />
      </div>
    )}
  </div>
);

export default ColorPicker;
