 } catch (error) {

    setModal({
        class: 'visible',
        msg: `Destruction is imposible. You've got funds.`,
        color: '#f470a9FF',
    });
    setTimeout(() => {
        setModal({
            class: 'hidden',
            msg: '',
            color: '',
        });
    }, 1500);
} finally {
    setModal({
        class: 'hidden',
        msg: 'Destruction completed',
        color: '#93d1d1ff',
    });
    setTimeout(() => {
        setModal({
            class: 'hidden',
            msg: '',
            color: '',
        });
    }, 1500);
}
  };