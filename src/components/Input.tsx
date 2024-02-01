import { Accessor, Setter, Show } from "solid-js";

interface IInputProps {
  label?: string;
  onChange: Setter<string>;
  value: Accessor<string>;
}

const Input = (props: IInputProps) => {
  const { label, onChange, value } = props;

  return (
    <label class="form-control w-full max-w-xs">
      <Show when={label}>
        <div class="label">
          <span class="label-text">{label}</span>
        </div>
      </Show>
      <input
        value={value()}
        onChange={(e) => onChange(e.currentTarget.value)}
        class="input input-bordered w-full max-w-xs"
      />
    </label>
  );
};

export default Input;
