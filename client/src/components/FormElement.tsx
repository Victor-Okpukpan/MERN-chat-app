import { ChangeEvent } from "react";

type TElementTypes = {
  isInput: boolean;
  type?: string;
  name?: string;
  id?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  style?: string;
};

// Input or Textarea element?
export default function FormElement({
  isInput,
  type,
  name,
  id,
  onChange,
  value,
  placeholder,
  style,
}: TElementTypes) {
  return (
    <>
      {isInput ? (
        <input
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`block w-full border p-2 mb-2 rounded-sm outline-none ${style}`}
        />
      ) : (
        <textarea name="" id=""></textarea>
      )}
    </>
  );
}
