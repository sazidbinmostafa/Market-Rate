"use client";
import { Key, ListBox, Select } from "@heroui/react";
import { Dispatch, SetStateAction } from "react";

export interface StateItem {
    id: string;
    name: string;
}

interface SortingPropsTypes {
    state: string | null
    setState: Dispatch<SetStateAction<string | null>>
}

export function SortingSelect({ state, setState, }: SortingPropsTypes) {

      const states = [
        {
          id: "default",
          name: "ডিফল্ট",
        },
        {
          id: "accending",
          name: "দাম: কম থেকে বেশি",
        },
        {
          id: "decending",
          name: "দাম: বেশি থেকে কম",
        },
      ];


    const selectedState = states.find((s) => s.id === state);

    return (
        <div className="space-y-2">
            <Select
                aria-label="সাজান"
                className="w-40"
                placeholder="নির্বাচন করুন"
                value={state}
                onChange={(value: Key | null) => setState(value !== null ? String(value) : null)}
            >
                <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                    <ListBox>
                        {states.map((state) => (
                            <ListBox.Item key={state.id} id={state.id} textValue={state.name}>
                                {state.name}
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                        ))}
                    </ListBox>
                </Select.Popover>
            </Select>
        </div>
    );
}