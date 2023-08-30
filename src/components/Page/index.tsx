import classNames from "classnames";
import React from "react";

export default function Page({ className, ...others }: React.HTMLProps<HTMLDivElement>) {
	return <div className={classNames('flex', className)} {...others} />
}
