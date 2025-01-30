import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export function PDFUploader({ onClose }: Props) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Here we'll handle the PDF processing
    console.log('Accepted files:', acceptedFiles);
    
    // TODO: Implement PDF processing logic
    // 1. Read the PDF file
    // 2. Extract transaction data
    // 3. Update the transactions list
    
    onClose();
  }, [onClose]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Upload de Fatura</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-indigo-500 bg-indigo-50'
              : 'border-gray-300 hover:border-indigo-400'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          {isDragActive ? (
            <p className="text-indigo-600">Solte o arquivo aqui...</p>
          ) : (
            <>
              <p className="text-gray-600 mb-2">
                Arraste e solte sua fatura PDF aqui, ou clique para selecionar
              </p>
              <p className="text-sm text-gray-500">
                Apenas arquivos PDF são aceitos
              </p>
            </>
          )}
        </div>

        <div className="mt-6 text-sm text-gray-500">
          <p className="mb-2">
            <strong>Nota:</strong> Suas informações são processadas localmente e com
            segurança.
          </p>
          <p>
            Suportamos faturas dos principais bancos: Nubank, Itaú, Bradesco, Santander
            e outros.
          </p>
        </div>
      </div>
    </div>
  );
}