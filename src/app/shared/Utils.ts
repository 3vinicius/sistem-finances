

export class Utils {
    formatarNumero(num: number| undefined): string {
        if (typeof num == "number") {
            try {
                const partes = num.toFixed(2).split('.');
                const parteInteira = partes[0]
                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                const parteDecimal = partes[1] || '00';
                return `${parteInteira},${parteDecimal}`;
            } catch (e) {
                return num.toString()
            }
        }
        return "";
    }

    formatarCnpj(cnpj: string): string {
        if (!cnpj) return '';
        return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
    }

    downloadArrayBuffer(body: ArrayBuffer, type: string, name: string): void {
        const blob = new Blob([body], { type: type });
        const blobUrl: string = window.URL.createObjectURL(blob);
        const fileName: string = name.slice(22).replace(/"/g, '').replaceAll('.',' ');
        const downloadLink: HTMLAnchorElement = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = fileName;
        downloadLink.click();
        downloadLink.remove();
    }

    removerMascaraCNPJ(cnpj: string | null | undefined): string {
        // @ts-ignore
        return cnpj.replace(/[.\-/]/g, '');
    }

    formatarData(date: Date): string {
        const year: number = date.getFullYear();
        const month: string = String(date.getMonth() + 1).padStart(2, '0');  // Mês é zero-indexed, então adicionamos 1
        const day: string = String(date.getDate()).padStart(2, '0');
        return `${day}/${month}/${year}`;
    }




    formatarDataParaString(dateString: string):string {
        try {
            if (dateString != null){
                console.log(dateString.length)
                if (dateString.length == 3) {
                    const date = new Date(dateString)
                    const dia: string = String(date.getDate()).padStart(2, '0');
                    const mes: string = String(date.getMonth() + 1).padStart(2, '0');
                    const ano: number = date.getFullYear();

                    return `${dia}/${mes}/${ano}`;
                }
                if (dateString.length > 3) {
                    const date = new Date(dateString.slice(0,3))
                    date.setHours(Number(dateString[3]),Number(dateString[4]))
                    const dia: string = String(date.getDate()).padStart(2, '0');
                    const mes: string = String(date.getMonth() + 1).padStart(2, '0');
                    const ano: number = date.getFullYear();
                    const horas: number =  date.getHours();
                    const min: number = date.getMinutes();

                    return `${dia}/${mes}/${ano} ${horas}h ${min}m`
                }
            }
            return "";
        } catch (err){
            return "";
        }
    }

    formatarStringData(data: string):string{
        try {
            return data.replaceAll("-","/");
        } catch (e) {
            return data;
        }
    }

    gerarListaDeAnos(inicial:number, final:number){
        const listaAnos = []
        for(let i = final; i>= inicial; i--){
            listaAnos.push(i)
        }
        return listaAnos;
    }

    formatarStringDataComAnoNoFinal(data: string): string {
        try {
            const partes = data.split('-');
            return `${partes[2]}/${partes[1]}/${partes[0]}`;
        } catch (e) {
            return data;
        }
    }

    public downloadB64(body:Blob[], type:string, name:string){
        const blob=  this.b64toBlob(body,type)
        const blobUrl = URL.createObjectURL(blob);
        const fileName = name;
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = fileName;
        downloadLink.click();
        downloadLink.remove();
    }

    private b64toBlob(b64Data:any, contentType:any) {
        const sliceSize = 512;
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i += 1) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, { type: contentType });
    }

}

