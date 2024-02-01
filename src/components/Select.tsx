import { Accessor, For, Setter, Show } from "solid-js";

interface IInputProps {
  label?: string;
  onChange: Setter<string>;
  value: Accessor<string>;
  options: any[]
}

const Input = (props: IInputProps) => {
  const { label, onChange, value, options } = props;

  return (
    <label class="form-control w-full max-w-xs">
      <Show when={label}>
        <div class="label">
          <span class="label-text">{label}</span>
        </div>
      </Show>
      <select class="select select-bordered w-full max-w-xs" onChange={e => onChange(e.currentTarget.value)} value={value()}>
          <For each={options}>
            {(metric) => <option value={metric.id}>{metric.label}</option>}
          </For>
        </select>
    </label>
  );
};

export default Input;
