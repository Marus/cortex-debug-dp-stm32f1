import { Extension, extensions, ExtensionContext, window } from 'vscode';
import * as path from 'path';

interface CortexDebug {
	registerSVDFile(expression: RegExp | string, path: string): void;
}

export function activate(context: ExtensionContext) {
	const cortexDebug: Extension<CortexDebug> = <Extension<CortexDebug>>extensions.getExtension('marus25.cortex-debug');
	if (!cortexDebug) {
		window.showErrorMessage('Cortex-Debug Extension is not available for device support packages');
		return;
	}

	cortexDebug.activate().then((cdbg) => {
		cdbg.registerSVDFile(/STM32F100[a-z0-9]{2}/i, path.join(context.extensionPath, 'data', 'STM32F100xx.svd'));
		cdbg.registerSVDFile(/STM32F101[a-z0-9]{2}/i, path.join(context.extensionPath, 'data', 'STM32F101xx.svd'));
		cdbg.registerSVDFile(/STM32F102[a-z0-9]{2}/i, path.join(context.extensionPath, 'data', 'STM32F102xx.svd'));
		cdbg.registerSVDFile(/STM32F103[a-z0-9]{2}/i, path.join(context.extensionPath, 'data', 'STM32F103xx.svd'));
		cdbg.registerSVDFile(/STM32F105[a-z0-9]{2}/i, path.join(context.extensionPath, 'data', 'STM32F105xx.svd'));
		cdbg.registerSVDFile(/STM32F107[a-z0-9]{2}/i, path.join(context.extensionPath, 'data', 'STM32F107xx.svd'));
	}, (error) => {
		console.log('Unable to activate cortexDebug');
	});
}

export function deactivate() {}
