function formatarCPF(cpfString) {
  return cpfString.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

module.exports = { formatarCPF };
