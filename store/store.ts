import { create } from 'zustand';

type CounterStore = {
    count:number;
    setCount: (newValue:number)=>void;
}

export const useCounterStore = create<CounterStore>((set) => ({
  count:0,
  setCount:(newValue)=>set({ count: newValue })

}));
