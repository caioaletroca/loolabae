import React from "react";
import classNames from "classnames";

export default function View({ className, ...others }: React.HTMLProps<HTMLDivElement>) {
	return <div className={classNames('flex flex-col flex-1', className)} {...others} />
}
