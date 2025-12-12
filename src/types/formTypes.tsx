import { JSX, ReactNode } from "react";

export interface loopProps {
    value: string;
    label: string;
  }

export interface FormControlProps {
    control?: string;
    label: string;
    prefix?: string;
    type?: string;
    maxLength?: number;
    placeholder?: string;
    name: string;
    className?: string;
    labelStyle?: string;
    inputStyle?: string;
    icon?: JSX.Element;
    onChange?: (event: any) => void;
    acceptFile?: string;
    options?: Array<loopProps> | null;
    value?: string | null;
    disabled?: boolean;
    require?: boolean;
    rows?: number;
    children?: ReactNode;
    checked?: boolean;
  }


  export interface FileComponentProps {
    reset?: () => void;
  }