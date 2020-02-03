import styled from 'styled-components';

export const Card = styled.li`
  width: 100%;
  max-width: 300px;
  background: #ffffff;
  border: 2px solid #fff;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.6) 0px 2px 15px -5px;
  transform: translate3d(0, 0, 0);
  transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1),
    border-color 0.3s cubic-bezier(0.19, 1, 0.22, 1);
  overflow: hidden;

  &:hover {
    transform: translate3d(0, -5px, 0);
    border-color: #f28e1c;
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  object-fit: scale-down;
  background: #ffffff;
  border-radius: 5px;
  margin-bottom: 8px;
`;

export const ImagePlaceholder = styled.span`
  font-size: 5rem;
  text-align: center;
  margin-top: auto;
  margin-bottom: auto;
`;

export const ProductTitle = styled.span`
  color: #666;
  font-size: 0.8rem;
  margin-top: auto;
  padding: 0 8px;
`;

export const ProductPrice = styled.span`
  color: #f28e1c;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 16px;
  padding: 0 8px;
`;

export const QuantityRow = styled.div`
  align-self: stretch;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AddButton = styled.button`
  width: 30px;
  height: 30px;
  background: #f28e1c;
  color: #ffffff;
  border: none;
  font-size: 1.3rem;
  font-weight: 300;

  &:hover {
    cursor: pointer;
  }
`;

export const RemoveButton = styled(AddButton)`
  background: #b03c3c;
`;
