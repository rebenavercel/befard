"use client";

import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
  type ReactNode,
  forwardRef,
} from "react";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import Button from "../Button";
import Close from "../Icons/Close";

type TDialogVariant = "default" | "dark" | "dark-transparent";

export interface IDialogProps extends DialogPrimitive.DialogProps {
  children: ReactNode;
  trigger?: ReactNode;
  triggerIcon?: ReactNode;
  title?: ReactNode;
  variant?: TDialogVariant;
  fullScreen?: boolean;
  className?: string;
  headerClassName?: string;
}

const DialogBase = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

export const DialogClose = DialogPrimitive.Close;

const DialogOverlay = forwardRef<
  ElementRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & {
    className?: string;
  }
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content> &
    Omit<
      IDialogProps,
      "buttonProps" | "triggerLabel" | "title" | "triggerIcon" | "imageHeader"
    >
>(({ className, variant, children, fullScreen, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />

    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "no-scrollbar fixed left-[50%] top-[50%] z-50 flex w-11/12 max-w-xl translate-x-[-50%] translate-y-[-50%] flex-col overflow-x-hidden bg-white duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        variant === "default" && "bg-white text-text-primary",
        variant === "dark" && "bg-surface-primary text-text-white-fixed",
        variant === "dark-transparent" &&
          "bg-surface-primary/30 backdrop-blur-md",
        fullScreen
          ? "flex h-full w-full max-w-none flex-col"
          : "max-h-[calc(100dvh_-_96px)]",
        className
      )}
      data-dialog-content
      {...props}
    >
      <div className="w-full">{children}</div>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogTitle = forwardRef<
  ElementRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title> & {
    className?: string;
  }
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("font-neutra-text-tf text-header-s uppercase", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogHeader = ({
  className,
  variant,
  title,
}: Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
  className?: string;
  variant?: TDialogVariant;
  title?: IDialogProps["title"];
}) => (
  <div
    data-dialog-header
    className={cn(
      "sticky top-0 z-20 flex items-center justify-between gap-x-8 py-4 pl-8 pr-4",
      variant === "default" && "bg-white text-text-primary",
      variant === "dark" && "bg-surface-primary text-text-white-fixed",
      variant === "dark-transparent" && "!text-text-white-fixed",
      className
    )}
  >
    {typeof title === "string" ? <DialogTitle>{title}</DialogTitle> : title}
    {!title && <DialogTitle className="sr-only hidden">&nbsp;</DialogTitle>}
    <DialogClose asChild>
      <Button
        buttonType="iconOnly"
        className={cn(
          "relative z-50 ml-auto p-0",
          variant === "default" && "!text-text-primary",
          variant === "dark" && "!text-text-white-fixed",
          variant === "dark-transparent" && "!text-text-accent-1"
        )}
        aria-label="close dialog"
      >
        close
      </Button>
    </DialogClose>
  </div>
);
DialogHeader.displayName = "DialogHeader";

const Dialog = ({
  children,
  variant = "default",
  title,
  fullScreen,
  trigger,
  triggerIcon,
  className,
  headerClassName,
  ...rest
}: IDialogProps) => {
  const showTriggerButton =
    typeof trigger === "string" || (trigger === undefined && triggerIcon);

  return (
    <DialogBase {...rest}>
      <DialogTrigger asChild>
        {showTriggerButton ? (
          <Button className="uppercase">
            {trigger}
            {triggerIcon}
          </Button>
        ) : (
          trigger
        )}
      </DialogTrigger>
      <DialogContent
        variant={variant}
        fullScreen={fullScreen}
        className={cn(className, "flex-row")}
      >
        <DialogTitle className="hidden" />
        <div className="p-12 relative">
          <DialogTrigger asChild className="absolute top-1 right-2">
            <Button className="p-2">
              <Close className="size-4" />
            </Button>
          </DialogTrigger>
          {children}
        </div>
      </DialogContent>
    </DialogBase>
  );
};

export { Dialog, DialogBase, DialogPortal, DialogOverlay, DialogContent };
